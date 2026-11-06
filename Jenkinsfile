
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Source code is checked out from GitHub.'
                checkout scm
            }
        }

        stage('Test Microservices') {
            steps {
                echo 'Running smoke tests...'

                sh '''
                    docker run --rm \
                    -e TEST_BASE_URL=http://host.docker.internal \
                    -v "$WORKSPACE:/app" \
                    -w /app \
                    node:20-alpine npm test
                '''
            }
        }

        stage('Build Docker Images') {
            steps {
                echo 'Building microservice images...'

                sh '''
                    docker build -t user-service:latest -f Dockerfile.user .
                    docker build -t product-service:latest -f Dockerfile.product .
                    docker build -t order-service:latest -f Dockerfile.order .
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed. Check the console output.'
        }
    }
}
