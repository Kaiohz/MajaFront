pipeline {
    agent any
    options {
        buildDiscarder(logRotator(numToKeepStr: '20'))
        disableConcurrentBuilds()
    }
    environment {
        APP_NAME = "majafront"
        CHROME_BIN="/usr/bin/chromium-browser"
        REMOTE_TARGET = "192.168.1.33"
        PATH_DEST = "/tmp"
        PATH_ORIGIN = "dist/${APP_NAME}/"
        PROCESS_NAME = "http-server"
        REPOSITORY = "maja"
        ARTIFACTORY_HOST = "192.168.1.28:8082"
    }

    stages {

        stage('Build') {
            steps { 
                echo '******** Build the app ********'
                sh 'npm install'
                sh 'npm run build' 
                sh 'ls -lia'
            }
        }

        stage('Artifactory'){
            steps{
                echo '******** Copy artifact to artifactory ********'
                sh "tar -cf ${APP_NAME}.tar.gz ${PATH_ORIGIN}"
                sh "curl -u admin:Password1 -T ${APP_NAME}.tar.gz http://${ARTIFACTORY_HOST}/artifactory/${REPOSITORY}/${APP_NAME}-${GIT_COMMIT}.tar.gz"
            }
        }

       stage('Copy app to remote server') {
            steps { 
                echo '******** Copy app to remote server ********'
                sh "curl -u admin:zaaquymN54* -O 'http://${ARTIFACTORY_HOST}/artifactory/${REPOSITORY}/${APP_NAME}-${GIT_COMMIT}.tar.gz'"
                sh "tar -xf ${APP_NAME}-${GIT_COMMIT}.tar.gz"
                //in case server is already running
                sh "sshpass -p zaaquymN54* ssh pi@${REMOTE_TARGET} 'if pgrep ${PROCESS_NAME} ; then pkill ${PROCESS_NAME}; fi'" 
                sh "sshpass -p zaaquymN54* scp -r ${PATH_ORIGIN} pi@${REMOTE_TARGET}:${PATH_DEST}"
                //sh "sshpass -p zaaquymN54* ssh pi@${REMOTE_TARGET} 'cd ${PATH_DEST};nohup ${PROCESS_NAME} ${APP_NAME} > foo.out 2> foo.err < /dev/null &'"
            }
        }
    }
    post { 
        always { 
            echo '******** End of pipeline ********'
            deleteDir()
        }
    }
}
