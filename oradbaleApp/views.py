from django.http import JsonResponse
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser,AllowAny
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from .models import Product, Order, OrderItem
from .serializers import UserSerializer, ProductSerializer, OrderSerializer
from rest_framework.decorators import api_view
from django.conf import settings
from django.shortcuts import redirect
import requests


class CreateUserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_permissions(self):
        if self.action == 'list' or self.action == 'retrieve': 
            permission_classes = [AllowAny]
        else:  
            permission_classes = [IsAdminUser]  
        return [permission() for permission in permission_classes]

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [AllowAny]
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=204)


# Payment Gateway Integration 

@api_view(['POST'])
@permission_classes([AllowAny])
def get_payment_methods(request):
    headers = {
        'Authorization': f'Bearer {settings.MYFATOORAH_API_KEY}',
        'Content-Type': 'application/json'
    }

    response = requests.post(f"{settings.MYFATOORAH_API_URL}/InitiatePayment", headers=headers, json=request.data)
    print(response)
    payment_methods = response.json()
    peymant_methods = payment_methods['Data']['PaymentMethods']
    knet_method = [item for item in peymant_methods if item['PaymentMethodId'] == 1]
    print(knet_method)
    return Response(knet_method)



@api_view(['POST'])
@permission_classes([AllowAny])
def initiate_payment(request):
    order_id = request.data['order_id']
    order = Order.objects.get(id=order_id)
    print(order.get_total_order_value())
    payment_data = {
        "PaymentMethodId": 1,
        "DisplayCurrencyIso": "KWD", 
        "CustomerReference": f"{order_id}",
        "InvoiceValue": f'{order.get_total_order_value()}',
        "CallBackUrl": settings.MYFATOORAH_CALLBACK_URL,
        "ErrorUrl": settings.MYFATOORAH_ERROR_URL,  
    }

    headers = {
        'Authorization': f'Bearer {settings.MYFATOORAH_API_KEY}',
        'Content-Type': 'application/json'
    }

    try:
        response = requests.post(f"{settings.MYFATOORAH_API_URL}/ExecutePayment", json=payment_data, headers=headers)
        response_data = response.json()
        print(response_data)
        if response.status_code == 200 and response_data.get("IsSuccess"):
            payment_url = response_data["Data"]["PaymentURL"]
            return Response({'payment_url': payment_url})
        else:
            return Response({'error': 'Payment initiation failed'}, status=400)
    except Exception as e:
        return Response({'error': str(e)}, status=500)
    

@api_view(['POST', 'GET'])
@permission_classes([AllowAny])
def payment_success(request):
    payment_id = request.GET.get('paymentId')  
    print(payment_id)
    verification_response = requests.post(
        f"{settings.MYFATOORAH_API_URL}/GetPaymentStatus",
        json={"Key": payment_id, "KeyType": "PaymentId"},
        headers={"Authorization": f"Bearer {settings.MYFATOORAH_API_KEY}"}
    )
    if verification_response.status_code == 200:
        payment_info = verification_response.json()
        print(payment_info)
        order_id = payment_info['Data']['CustomerReference']

        if payment_info['Data']['InvoiceStatus'] == "Paid":
            order = Order.objects.get(id=order_id)
            order.status = 'paid'
            order.save()
            return redirect(f'{settings.FRONTEND_URL}/payment-success?order_id={order_id}&payment_id={payment_id}')
    else:
        return redirect(f'{settings.FRONTEND_URL}/payment-failure?error=verification_failed')


@api_view(['POST', 'GET'])
@permission_classes([AllowAny])
def payment_failure(request):
    payment_id = request.GET.get('paymentId')  
    return redirect(f'{settings.FRONTEND_URL}/payment-failure?order_id={payment_id}')
