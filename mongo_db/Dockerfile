# Use the official MongoDB image from Docker Hub
FROM mongo:3.6.10

# Set the working directory
WORKDIR /usr/src/configs

# Copy the local file to the container's workspace
COPY mongo.conf /usr/src/configs/

# Expose the MongoDB port
EXPOSE 27017

# Run MongoDB when the container launches
CMD ["mongod", "--config", "/usr/src/configs/mongo.conf"]
