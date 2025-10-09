pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/PrajwalGPawar/matrimony-frontend.git', branch: 'dev'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('matrimony-frontend') {
                    bat 'npm install'
                    bat 'npm install --save-dev sonar-scanner'
                }
            }
        }

        stage('Build') {
            steps {
                dir('matrimony-frontend') {
                    bat 'npm run build'
                }
            }
        }

        stage('Test with Coverage') {
            steps {
                dir('matrimony-frontend') {
                    bat 'npm test -- --coverage'
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                dir('matrimony-frontend') {
                    withSonarQubeEnv('SonarQube Server') {
                        bat '.\\node_modules\\.bin\\sonar-scanner.cmd'
                    }
                }
            }
        }

        stage('Archive Build') {
            steps {
                dir('matrimony-frontend') {
                    archiveArtifacts artifacts: 'build/**', fingerprint: true
                }
            }
        }
    }
}
