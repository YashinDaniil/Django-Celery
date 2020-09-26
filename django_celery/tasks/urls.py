from django.urls import path
from .views import *

urlpatterns = [
    path('', run_task, name='run_task'),
    path('<task_id>/', get_status, name='get_task_status'),
]
