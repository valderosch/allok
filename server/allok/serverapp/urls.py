from django.urls import path
from .views import save_data, index, ParkingPointList, get_point_data, RouteDistanceView

urlpatterns = [
    path('', index, name='index'),
    path('save-data/', save_data, name='save_data'),
    path('parking-points/', ParkingPointList.as_view(), name='parking-point-list'),
    path('api/parking-points/<int:parking_point_id>/point-data/', get_point_data, name='latest-camera-data'),
    path('route-distance/', RouteDistanceView.as_view(), name='route-distance'),
]
