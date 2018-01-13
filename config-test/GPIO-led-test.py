import RPi.GPIO as GPIO   //python GPIO库  
import time               //time.sleep库  
  
GPIO.setmode(GPIO.BOARD)  //板子编号方式  
GPIO.setup(8,GPIO.OUT)    //设置编号8GPIO为输出模式  
  
while True:  
   GPIO.output(8,True)  
   time.sleep(1)  
   GPIO.output(8,False)  
   time.sleep(1)  