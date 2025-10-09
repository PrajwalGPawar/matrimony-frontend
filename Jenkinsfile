
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
                    // Install project dependencies including sonar-scanner
                    bat 'npm install'
                   bat 'npm install --save-dev jest-watch-typeahead@0.6.5'
                    // Also install sonar-scanner locally (if not already in package.json)
                    // bat 'npm install --save-dev sonar-scanner'
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



        // stage('SonarQube Analysis') {
        //     steps {
        //         dir('matrimony-frontend') {
        //             withSonarQubeEnv('SonarQube Server') {
        //                 // Use local sonar-scanner from node_modules
        //                 bat '.\\node_modules\\.bin\\sonar-scanner.cmd'
        //             }
        //         }
        //     }
        // }

        stage('Archive Build') {
            steps {
                dir('matrimony-frontend') {
                    archiveArtifacts artifacts: 'build/**', fingerprint: true
                }
            }
        }
    }
}
