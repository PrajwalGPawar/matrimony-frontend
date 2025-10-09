pipeline {
    agent any

    stages {
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

        stage('Test') {
            steps {
                dir('matrimony-frontend') {
                    // Set CI=true to avoid jest watch plugin error on Jenkins
                    bat 'set CI=true && npm test -- --coverage'
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

