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
                    bat 'npm install --save-dev jest-watch-typeahead@0.6.5'
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

        // Optional: Enable SonarQube when ready
        // stage('SonarQube Analysis') {
        //     steps {
        //         dir('matrimony-frontend') {
        //             withSonarQubeEnv('SonarQube Server') {
        //                 bat '.\\node_modules\\.bin\\sonar-scanner.cmd'
        //             }
        //         }
        //     }
        // }

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
