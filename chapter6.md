# ROS services
The publish / subscribe model is a very flexible communication paradigm, but its many-to-many one-way transport is not appropriate for RPC request / reply interactions, which are often required in a distributed system. Request / reply is done via a Service, which is defined by a pair of messages: one for the request and one for the reply. A providing ROS node offers a service under a string name, and a client calls the service by sending the request message and awaiting the reply. Client libraries usually present this interaction to the programmer as if it were a remote procedure call.

Services are defined using srv files, which are compiled into source code by a ROS client library.

A client can make a persistent connection to a service, which enables higher performance at the cost of less robustness to service provider changes.

## Understand ROS Services
To understand ros services we run ***'Myfirst.launch'***
```bash
roslaunch rosbasics Myfirst.launch
```
To know the running services .In new terminal we use roscommand
```bash
rosservice list
```
which outputs
```
/clear
/controller/get_loggers
/controller/set_logger_level
/kill
/reset
/rosout/get_loggers
/rosout/set_logger_level
/spawn
/turtle1/get_loggers
/turtle1/set_logger_level
/turtle1/set_pen
/turtle1/teleport_absolute
/turtle1/teleport_relative
```
Since services are RPC request / reply interactions to call a service say ***'/clear'*** run command
```bash
rosservice call /clear
```
above command clears the background of the turtlesim_node.

Like topics uses ROSmsgs Serivice use ROSsrv files which has extention ***'.srv'***
Like to view Topic type that is published using
```bash
rostopic type /turtle1/cmd_vel |rosmsg show
```
we can view the srv parmaeter using
```bash
rosservice type /clear |rossrv show
```
will output empty srv structure ie,
```
---
```
Lets see another service
```bash
rosservice type /spawn |rossrv show
```
will output empty srv structure ie,
```
float32 x
float32 y
float32 theta
string name
---
string name

```
So How to use this idea to make service call let us see which has inputs x,y theta
,name like below
``` bash
rosservice call /spawn <float32 x> <float32 y> <float32 theta> <string name>
```
So above command will be like
``` bash
rosservice call /spawn 2 2 0.2 ""
```
which outputs
```
name: "turtle2"
```
and you can see new ***turtle*** in screen

___

# Let's create a ROS service
for this we need to create ***'mysrv.srv'*** file in srv folder located in rosbasics

A typical ***'xxx.srv'*** file has two parts requst side and result side
you have have any combination for navtive ROSmsgs in both requst and result side
the in ***'.srv'*** file request and result sides are seprated by ***'---'***
```
requst side
---
result side
```
So ***mysrv.srv*** will be like
```
float64 x
float64 y
float64 z
---
float64 addxy
float64 addxz
float64 addyz
```
___
> ***The following steps are same as in create in ROSmsgs except one.***

* after createing in the above file save and close then open ***'package.xml'*** located in rosbasics Folder add lines and savefile and close
 ```XML
 <build_depend>message_generation</build_depend>
 <exec_depend>message_runtime</exec_depend>
 ```
* then open ***'CMakeLists.txt'*** located in rosbasics Folder add lines and savefile and close
* >Ctrl+F and search **"find_package"** and add the line

```python
 find_package(catkin REQUIRED COMPONENTS
   roscpp
   rospy
   std_msgs
   message_generation ##add this line
)
 ```
  * >Ctrl+F and search **"catkin_package"** and add the this  lines ,this is to  make sure you export the message runtime dependency.

```python
 catkin_package(
  # INCLUDE_DIRS include
  #  LIBRARIES rosbasics
  CATKIN_DEPENDS roscpp rospy std_msgs message_runtime #remove comment
  # also add message_runtime
  #  DEPENDS system_lib
 )
 ```
 * >Ctrl+F and search **"generate_messages"** and remove ***'#'***
  ```python
  generate_messages(
    DEPENDENCIES
    std_msgs
  )
 ___

> ***step which is differnt is below***

* >Ctrl+F and search **"generate_messages"** and remove ***'#'***

```python
add_service_files(
  FILES
  mysrv.srv
#   Service1.srv
#   Service2.srv
)
```
---
After above steps save and close ***'CMakeLists.txt'*** and open terminal
 ```bash
 cd cd ROS_Worksop/
 catkin_make
 ```
 ---
 # ROS Service Server and Service Client


## Serivceserver
Let us create service server

 ***myserviceserver.py***
 ```python
 #!/usr/bin/python
 import rospy
 from rosbasics.srv import mysrv,mysrvResponse

 def mysrvhandle(req):
     return mysrvResponse(req.x+req.y,req.x+req.z,req.y+req.z)


 def myserver():
     rospy.init_node(name="service_server_node",anonymous=False)
     ser=rospy.Service("addallthree",mysrv,mysrvhandle)
     rospy.loginfo("ready at your service")
     while not rospy.is_shutdown():
         pass

 if __name__ == '__main__':
     try:
         myserver()
     except rospy.ROSInterruptException:
         pass
 ```

---
# DIY
1. create your own rosnode with serviceserver and publisher in it
2. create your own rosnode with serviceserver and  subscriber in it
3. create your own rosnode with serviceserver ,publisher and subscriber

