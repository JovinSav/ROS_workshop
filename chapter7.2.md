* ***\<joint>*** : The joint element describes the kinematics and dynamics of the joint and also specifies the safety limits of the joint.only add if more than 2 links were you have joints

 ![](images/joint.png)

 ```XML
 <joint name="my_joint" type="floating"><!--
two atributes
name="any thing you Like" imp to mention
type=(imp to mention)
Specifies the type of joint, where type can be one of the following:

  revolute - a hinge joint that rotates along the axis and has a limited range specified by the upper and lower limits.
  continuous - a continuous hinge joint that rotates around the axis and has not upper and lower limits
  prismatic - a sliding joint that slides along the axis, and has a limited range specified by the upper and lower limits.
  fixed - This is not really a joint because it cannot move. All degrees of freedom are locked. This type of joint does not require the axis, calibration, dynamics, limits or safety_controller.
  floating - This is not really a joint because all 6 degrees of freedom are free.
  planar - This joint allows motion in a plane perpendicular to the axis.

  -->
    <origin xyz="0 0 1" rpy="0 0 3.1416"/>
     <parent link="link1"/>
     <child link="link2"/>

     <calibration rising="0.0"/>
     <dynamics damping="0.0" friction="0.0"/>
     <limit effort="30" velocity="1.0" lower="-2.2" upper="0.7" />
     <safety_controller k_velocity="10"/>
 </joint>

 <origin> (optional: defaults to identity if not specified)

  This is the transform from the parent link to the child link. The joint is located at the origin of the child link, as shown in the figure above.
  xyz (optional: defaults to zero vector)
      Represents the $$x,y,z$$ offset.
  rpy (optional: defaults 'to zero vector 'if not specified)
      Represents the rotation around fixed axis: first roll around x, then pitch around y and finally yaw around z. All angles are specified in radians.
<parent> (required)

  Parent link name with mandatory attribute:

  link
      The name of the link that is the parent of this link in the robot tree structure.
<child> (required)
  Child link name with mandatory attribute:
  link
      The name of the link that is the child link.
<axis> (optional: defaults to (1,0,0))
  The joint axis specified in the joint frame. This is the axis of rotation for revolute joints, the axis of translation for prismatic joints, and the surface normal for planar joints. The axis is specified in the joint frame of reference. Fixed and floating joints do not use the axis field.

  xyz (required)

      Represents the $$x,y,z$$ components of a vector. The vector should be normalized.
<calibration> (optional)

  The reference positions of the joint, used to calibrate the absolute position of the joint.

  rising (optional)
      When the joint moves in a positive direction, this reference position will trigger a rising edge.

  falling (optional)
      When the joint moves in a positive direction, this reference position will trigger a falling edge.
<dynamics> (optional)

  An element specifying physical properties of the joint. These values are used to specify modeling properties of the joint, particularly useful for simulation.

  damping (optional, defaults to 0)

      The physical damping value of the joint ($$\frac{N \cdot s}{m}$$ for prismatic joints, $$\frac{N \cdot m \cdot s}{rad}$$ for revolute joints).

  friction (optional, defaults to 0)

      The physical static friction value of the joint ($$N$$ for prismatic joints, $$N \cdot m$$ for revolute joints).
<limit> (required only for revolute and prismatic joint)

  An element can contain the following attributes:

  lower (optional, defaults to 0)
      An attribute specifying the lower joint limit (radians for revolute joints, meters for prismatic joints). Omit if joint is continuous.

  upper (optional, defaults to 0)
      An attribute specifying the upper joint limit (radians for revolute joints, meters for prismatic joints). Omit if joint is continuous.

  effort (required)

      An attribute for enforcing the maximum joint effort ($$|$$applied effort$$| < |$$effort$$|$$).

  velocity (required)

      An attribute for enforcing the maximum joint velocity.  
<safety_controller> (optional)

  An element can contain the following attributes:

  soft_lower_limit (optional, defaults to 0)

      An attribute specifying the lower joint boundary where the safety controller starts limiting the position of the joint. This limit needs to be larger than the lower joint limit (see above).

  soft_upper_limit (optional, defaults to 0)

      An attribute specifying the upper joint boundary where the safety controller starts limiting the position of the joint. This limit needs to be smaller than the upper joint limit (see above).

  k_position (optional, defaults to 0)

      An attribute specifying the relation between position and velocity limits.
  k_velocity (required)

      An attribute specifying the relation between effort and velocity limits.
 ```
