import time
from celery import shared_task




@shared_task
def create_task(task_type):
    time.sleep(task_type)
    return True


#------------------------------------------------------------
from celery.task import periodic_task
from celery.schedules import crontab
@periodic_task(run_every=(crontab(minute='/*1')), name='periodic_task')
def periodic_task1():
    print('Test')



from datetime import timedelta

@periodic_task(run_every=(timedelta(ho)), name='periodic_task')
def periodic_task2():
    print('Test')



from datetime import datetime

send_mail_task.apply_async(
    (('test@example.com', ), 'Celery test', 'test', {}),
    eta=datetime(2020, 10, 14, 9, 0)
)