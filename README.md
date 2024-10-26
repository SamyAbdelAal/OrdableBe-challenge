# OrdableBe Challenge

Welcome to the OrdableBe Challenge repository! This project is a mock e-commerce platform built using Django for the backend and React for the frontend. Users can browse products, manage a shopping cart, and complete purchases, while admins can manage product listings and orders.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Running the Application](#running-the-application)

## Features

- User registration and authentication
- Product catalog browsing
- Shopping cart functionality
- Order checkout process
- Admin panel for managing products and orders (can be accessed from http://localhost:3000/admin)

## Technologies Used

- **Backend:** Django, Django REST Framework
- **Frontend:** React, Semantic UI React
- **Database:** SQLite (default)

## Installation

To set up the project locally, follow these steps:

### Clone the repository

```bash
git clone https://github.com/SamyAbdelAal/OrdableBe-challenge.git
cd OrdableBe-challenge
```

### Set up the backend


1. Create a virtual environment:

   ```bash
   python -m venv venv  # or virtualenv venv --python=python3
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

2. Install the required packages:

   ```bash
   pip install -r requirements.txt
   ```

3. Apply migrations:

   ```bash
   python manage.py migrate
   ```

4. Create a superuser (for admin access):

   ```bash
   python manage.py createsuperuser
   ```

### Set up the frontend

In a new terminal run the following commands

1. Navigate to the frontend directory:

   ```bash
   cd ../react-FE-ordable
   ```

2. Install the required packages:

   ```bash
   yarn install
   ```

## Running the Application

### Backend

To run the Django backend server:
run this command in main repo directory

```bash
python manage.py runserver
```

By default, the backend will be accessible at `http://127.0.0.1:8000/`.


### Frontend

In a new terminal run the following commands

To run the React frontend application:

```bash
cd react-FE-ordable
yarn start
```

By default, the frontend will be accessible at `http://localhost:3000/`.

