pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                dir('matrimony-frontend') {
                    bat 'npm install && npm install --save-dev jest-watch-typeahead@0.6.5 sonar-scanner'
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
                    bat 'npm test'
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

        stage('Debug: List Files') {
            steps {
                dir('matrimony-frontend') {
                    bat 'dir /s'
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
