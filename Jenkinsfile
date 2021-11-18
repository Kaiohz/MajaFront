pipeline {
    agent any 
    
    environment {
        CHROME_BIN="/usr/bin/chromium-browser"
    }

    stages {
        stage('Install') {
            steps { 
                sh 'npm install' 
            }
        }

        stage('Unit tests') {
            steps { 
                sh 'npm test' 
            }
        }

        stage('Build') {
            steps { 
                sh 'npm build' 
            }
        }
    }
}
