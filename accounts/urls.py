from django.urls import re_path, include

accounts_urlpatterns = [
    re_path(r'api/', include('djoser.urls')),
    re_path(r'api/', include('djoser.urls.authtoken')),
]