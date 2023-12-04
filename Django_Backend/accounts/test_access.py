from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth.models import User
import pytest
import uuid

# Create your tests here.
@pytest.mark.django_db
class TestLogins:
    def test_if_user_is_anonymous_returns_401(self):


        client = APIClient()
        response = client.get ('/api/TotalOrders')

        assert response.status_code == status.HTTP_401_UNAUTHORIZED


    def test_if_user_is_authenicated_with_no_permissions_returns_403(self):


        client = APIClient()
        client.force_authenticate(user={})
        response = client.get ('/api/TotalOrders')

        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_if_user_is_staff_returns_200(self):


        client = APIClient()
        client.force_authenticate(user=User(is_staff=True))
        response = client.get ('/api/TotalOrders')

        assert response.status_code == status.HTTP_200_OK

   
        