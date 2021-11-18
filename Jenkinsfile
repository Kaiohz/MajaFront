pipeline {
    agent any 
    
    environment {
        CHROME_BIN="/usr/bin/chromium-browser"
    }

    stages {
        stage('Install') {
            steps { 
                echo '******** Install all dependancies ********'
                sh 'npm install' 
            }
        }

        stage('Unit tests') {
            steps { 
                echo '******** Launch all tests ********'
                sh 'npm test' 
            }
        }

        stage('Build') {
            steps { 
                echo '******** Build the app ********'
                sh 'npm run build' 
            }
        }
    }
}
