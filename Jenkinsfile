pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
                bat 'npm install --save-dev jest-watch-typeahead@0.6.5 sonar-scanner'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Test') {
            steps {
                bat 'npm test'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube Server') {
                    // Use the sonar-scanner installed locally in node_modules
                    bat '.\\node_modules\\.bin\\sonar-scanner.cmd'
                }
            }
        }

        // Optional: for debugging
        stage('Debug: List Files') {
            steps {
                bat 'dir /s'
            }
        }

        stage('Archive Build') {
            steps {
                archiveArtifacts artifacts: 'build/**', fingerprint: true
            }
        }
    }
}
