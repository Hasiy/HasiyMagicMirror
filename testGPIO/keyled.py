import RPi.GPIO as GPIO   //python GPIO库  
import time               //time.sleep库  
  
GPIO.setmode(GPIO.BCM)    //板子编号方式  
GPIO.setup(23,GPIO.OUT)   //设置编号23GPIO为输出模式  
GPIO.setup(24,GPIO.IN)    //输入模式  
  
while True:  
    if GPIO.input(24):      
       GPIO.output(23,True)  
    else :  
       GPIO.output(24,False)  
time.sleep(0.1)           //读取按键时间间隔  