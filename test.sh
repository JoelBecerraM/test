#!/bin/bash

DIR=/Users/joelbecerramiranda/Apps/Intran/ECommerceWEB
APP_LIB=${DIR}/src/main/webapp/WEB-INF/lib
LOG4J=${DIR}/src/main/webapp/WEB-INF/log4j.properties 
TOMCAT_LIB=/opt/apache-tomcat-9.0.65/lib
JAVA_HOME=/usr

CLASSPATH=$DIR/target/classes
for i in `ls -1a $APP_LIB/*.jar`
do
	if [ -f "$i" ] ; then
		CLASSPATH="$CLASSPATH":"$i"
	fi
done
for i in `ls -1a $TOMCAT_LIB/*.jar`
do
	if [ -f "$i" ] ; then
		CLASSPATH="$CLASSPATH":"$i"
	fi
done

#echo $LOG4J
#echo $CLASSPATH
$JAVA_HOME/bin/java -Dlog4j=${LOG4J} -Decommerce.home=/Users/joelbecerramiranda/ecommerce -cp $CLASSPATH mx.intran.ecommerce.util.Test "$@"

