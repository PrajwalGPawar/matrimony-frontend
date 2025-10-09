pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                dir('matrimony-frontend') {
                    // Install project dependencies including sonar-scanner
                    bat 'npm install'
                
                    // Also install sonar-scanner locally (if not already in package.json)
                    // bat 'npm install --save-dev sonar-scanner'
                }
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
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
                archiveArtifacts artifacts: 'build/**', fingerprint: true
            }
        }
    }
}