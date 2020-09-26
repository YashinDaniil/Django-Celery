from tasks import tasks
from unittest.mock import patch, call

def test_task():
    assert tasks.create_task.run(10)
    assert tasks.create_task.run(20)
    assert tasks.create_task.run(30)