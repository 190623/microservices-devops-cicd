
pipeline {
    agent any

    environment {
        TEST_BASE_URL = 'http://host.docker.internal'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code from GitHub.'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js dependencies...'
                sh 'npm install'
            }
        }

        stage('Test Microservices') {
            steps {
                echo 'Running microservices smoke tests...'
                sh 'npm test'
            }
        }

        stage('Build Docker Images') {
            steps {
                echo 'Building microservice Docker images...'

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
