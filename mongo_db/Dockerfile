# Use the official MongoDB image from Docker Hub
FROM mongo:3.6.10

# Set the working directory
WORKDIR /usr/src/configs

# Create directories and set permissions
RUN mkdir -p /var/lib/mongo && mkdir -p /var/log/mongodb && chown -R mongodb:mongodb /var/lib/mongo /var/log/mongodb

# Copy the local file to the container's workspace
COPY mongo.conf /usr/src/configs/

# Expose the MongoDB port
EXPOSE 27017

# Run MongoDB when the container launches
CMD ["mongod", "--config", "/usr/src/configs/mongo.conf"]
