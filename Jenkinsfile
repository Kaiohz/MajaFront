pipeline {
    agent any 
    
    environment {
        CHROME_BIN="/usr/bin/chromium-browser"
    }

    stages {

        stage('Where am i ') {
            steps { 
                sh 'pwd' 
                sh 'ls'
            }
        }
        stage('Install') {
            steps { 
                sh 'npm install' 
            }
        }

        stage('Unit tests') {
            steps { 
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
