pipeline {
    agent any 

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
                sh 'export CHROME_BIN=/usr/bin/chromium-browser;npm run-script test' 
            }
        }

        stage('Build') {
            steps { 
                sh 'npm run-script build' 
            }
        }
    }
}
