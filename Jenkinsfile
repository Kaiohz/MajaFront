pipeline {
    agent any 
    stages {
        stage('Install npm') {
        steps { 
            sh 'apt-get install npm' 
        }
        }
        stage('Install') {
        steps { 
            sh 'npm install' 
        }
        }

        stage('Test') {
        parallel {
            stage('Static code analysis') {
                steps { sh 'npm run-script lint' }
            }
            stage('Unit tests') {
                steps { 
                    sh 'npm run-script test' 
                    }
            }
        }
        }

        stage('Build') {
        steps { sh 'npm run-script build' }
        }
    }
}
