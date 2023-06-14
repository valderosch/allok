from django.urls import path

from . import views
from .views import save_data, index, ParkingPointList

urlpatterns = [
    path('', index, name='index'),
    path('save-data/', save_data, name='save_data'),
    path('parking-points/', ParkingPointList.as_view(), name='parking-point-list'),
]
