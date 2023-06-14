from django.contrib import admin
from .models import ParkingPoint

# parking point register
class ParkingPointAdmin(admin.ModelAdmin):
    pass

admin.site.register(ParkingPoint, ParkingPointAdmin)
# Register your models here.
