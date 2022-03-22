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
        PROCESS_NAME = "http-server"
        REPOSITORY = "majafront"
        ARTIFACTORY_HOST = "192.168.1.28:8082"
        VERSION = sh(script:'node -e "console.log(require(\'./package.json\').version);"',returnStdout: true).trim()
        PACKAGE_NAME = "${APP_NAME}-${VERSION}"
    }

    stages {

        stage('Build') {
            steps { 
                echo '******** Build the app ********'
                sh 'npm install'
                sh 'npm pack'
            }
        }

        stage('Artifactory'){
            steps{
                echo '******** Copy artifact to artifactory ********'
                sh "curl -u admin:Password1 -T ${PACKAGE_NAME}.tgz http://${ARTIFACTORY_HOST}/artifactory/${REPOSITORY}/${PACKAGE_NAME}-${GIT_COMMIT}.tgz"
            }
        }

       stage('Copy app to remote server') {
            steps { 
                echo '******** Copy app to remote server ********'
                sh "curl -u admin:Password1 -O 'http://${ARTIFACTORY_HOST}/artifactory/${REPOSITORY}/${PACKAGE_NAME}-${GIT_COMMIT}.tgz'"
                //in case server is already running
                //sh "sshpass -p zaaquymN54* ssh pi@${REMOTE_TARGET} 'if pgrep ${PROCESS_NAME} ; then pkill ${PROCESS_NAME}; fi'" 
                sh "tar xf ${PACKAGE_NAME}-${GIT_COMMIT}.tgz"
                sh "sshpass -p zaaquymN54* scp -r package/ pi@${REMOTE_TARGET}:${PATH_DEST}"
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
