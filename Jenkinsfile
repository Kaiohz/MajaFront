pipeline {
    agent any 

    stages {
        stage('Install') {
            steps { 
                sh 'npm install' 
            }
        }

        stage('Unit tests') {
            steps { 
                sh 'export CHROME_BIN=/usr/bin/chromium-browser'
                sh 'npm run-script test' 
            }
        }

        stage('Build') {
            steps { 
                sh 'npm run-script build' 
            }
        }
    }
}
