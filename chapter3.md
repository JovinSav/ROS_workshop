# Publisher Subscriber node
These are the basics nodes in ROS which used to share informations between nodes
a publisher node publish the data using **ROS Topics** and Subscriber nodes will
Subscribe to this topic to do this nodes specific task

In ROS we can write  these nodes in c++ python lisp and a node can have many publishers and subscribers
### Publisher nodes
These nodes in ROS which the user make only has funtionality of publishing required data to topics to which any number of subscriber can attach

### Subscriber nodes
These nodes can subscribe to published topics from an another node and do its actions based on the input data

### Publisher Subscriber nodes
These nodes can subscribe to a topic published topic from a node and also publish data based on conditions or refine the data and input to various nodes attached to it


> All the examples from this this chapter can be done in c++ also but we use python for this course
> Since this is an introducry course plus learning curve for ROS is higher if many
new to C++.
___
>I hope Every one has Atom ide installed then
```
Open ATOM ide
```

```
File->Open Folder->select ROSworksop folder from UI appeard->click ok
after that you left side you have tree view
```

```
|--ROS_Worksop
   |--devel
   |--build
   |--src
      |--rosbasics
         |--include
         |--src
             -- node1.py
             -- node2.cpp
         --CMakeLists.txt
         --package.xml
```
# Let's create publisher/subscriber node
> Create a file name __'helloworldpub.py'__ in **src folder in rosbasics**
## Publisher node
**helloworldpub.py**
```python
#!/usr/bin/python

import rospy #ROS module
from std_msgs.msg import String #ROSmsg module

def main():
 rospy.init_node(name="Helloworld",anonymous=False)  #init_node will start the node
 pub=rospy.Publisher("mytopic",String,queue_size=0) #create publisher in name
 r=rospy.Rate(hz=10) # Rate at which data publishes
 msg=String()
 msg.data="Helloworld"
 while not rospy.is_shutdown():
  pub.publish(msg)
  r.sleep()
if __name__ == '__main__':
 try:
     main()
 except rospy.ROSInterruptException:
  pass

```

To make code excuatable
```bash
cd ROS_Worksop/src/rosbasics/src
#then
chmod +x helloworldpub.py
#then
cd ROSworksop
catkin_make

```
To run the node
* Open new termial *(make sure roscore is running)*
 ```bash
 rosrun rosbasics helloworldpub.py
 ```
* To see publsihed msg Open new terminal
 ```bash
 rostopic echo /mytopic
 ```

## Subscriber node
**helloworldsub.py**
```python
#!/usr/bin/python
import rospy
from std_msgs.msg import String

def callback(msg):
  print(msg.data)

def main():
  rospy.init_node(name="mysub",anonymous=False)
  sub=rospy.Subscriber("/mytopic",String,callback)
  rospy.loginfo("subscriber init")

if __name__ == '__main__':
  try:
      main():
      rospy.spin()
      '''
        rospy.spin() is same as
        while not rospy.is_shutdown():
            pass

        '''
  except rospy.ROSInterruptException:
    pass

```
To make code excuatable
```bash
cd ROS_Worksop/src/rosbasics/src
#then
chmod +x helloworldsub.py
#then
cd ROSworksop
catkin_make

```
To run the node
* Open new termial *(make sure roscore is running)*
 ```bash
 rosrun rosbasics helloworldsub.py
 ```

## Subscribler Publishers in one node
Till now we have made is individual subscriber and publisher in a ROS node you can have many publishers and subscribers

As we metioned a ROS node may contain any number of combinations of
 * publishers
 * subscribers
 * Services
  * Service clients
  * Service servers
 * Actions
  *  Action clients
  *  Action servers

As the funtionality of the node increases its better to impliment oops(object oriented programming) to remove errors
 pubsub.py
here we are going to create a node which control location turtle
which has one subscriber and one publisher which
* publishes topic:-turtle1/cmd_vel
* subscribe:-turtle1/pose

**pubsub.py**
```python
#!/usr/bin/python

import rospy
from geometry_msgs.msg import Twist
from turtlesim.msg import Pose
import math
class pubsub():
  def __init__(self):
    rospy.init_node("turtlecontroller",anonymous=False)
    self.commad=Twist()
    self.null=Twist()
    self.pub=rospy.Publisher("turtle1/cmd_vel",Twist,queue_size=0)
    self.sub=rospy.Subscriber("turtle1/pose",Pose,self.callback)
    self.x =0
    self.y = 0
    self.pos=Pose()
    r=rospy.Rate(hz=10)
    self.flag=0
    self.maxv=0.5
    self.maxw=5.0

    self.commad.linear.y=0
    self.commad.linear.z=0
    self.commad.angular.x=0
    self.commad.angular.y=0

    self.headx=0
    self.heady=0
    self.null.linear.x=0
    self.null.linear.y=0
    self.null.linear.z=0
    self.null.angular.x=0
    self.null.angular.y=0
    self.null.angular.z=0

    rospy.loginfo("commad node status")

  def callback(self,msg):
    self.pos=msg

  def run(self):
    while not rospy.is_shutdown():
      if (self.flag==0 or  self.flag==1):
        self.pub.publish(self.null)
        self.x,self.y=map(float,raw_input("input x,y :\t").split())
        self.flag=2
      else:
        trgx=self.x-self.pos.x
        trgy=self.y-self.pos.y
        ttheta=self.pos.theta
        self.headx=math.cos(ttheta)
        self.heady=math.sin(ttheta)
        sqrt=pow(trgx,2)+pow(trgy,2)
        sqrt=pow(sqrt,0.5)

        if sqrt<=0.03:
          self.flag=1
          self.pub.publish(self.null)
        else:


          u=(trgx*self.headx+trgy*self.heady)/sqrt
          if u>1:
              u=1
          s=1-pow(u,2)
          print(self.pos.x,self.pos.y,u,sqrt)
          angle=math.atan2(pow(s,0.5),u)

          v=min(self.maxv,sqrt)
          if angle==0:
              self.commad.linear.x=v
              self.commad.angular.z=0

          elif angle!=0:
            self.commad.linear.x=v
            self.commad.angular.z=(angle/math.pi)*-1.0* self.maxw

          self.pub.publish(self.commad)

if __name__ == '__main__':
  try:
    mynode=pubsub()
    mynode.run()
  except rospy.ROSInterruptException:
    pass

```



## *Important points in pub/sub nodes*
* __Topic name subsribing to__
* __ROSmsg struture which is use full to your rosnode__
* __Freqency of publisher node and subscriber__
* __Suitable qeue size of subscribe node (mainly depends upon Freqency of publisher)__
---
* [HOME](https://jovinsav.github.io/Rosworkshop/)
* [Back to:Chapter 2](https://jovinsav.github.io/Rosworkshop/chapter2.html)
* [Next :Chapter 4](https://jovinsav.github.io/Rosworkshop/chapter4.html)

