pipeline {
    agent any

    environment {
        APP_URL     = 'http://localhost:3000'
        MONGODB_URI = credentials('MONGODB_URI')
        IMAGE_APP   = 'irfani-events-app'
        IMAGE_TEST  = 'irfani-events-tests'
        RESULTS_DIR = "${WORKSPACE}/test-results"
    }

    triggers {
        githubPush()
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
                script {
                    env.COMMITTER_EMAIL = sh(
                        script: "git log -1 --format='%ae'",
                        returnStdout: true
                    ).trim()
                    echo "Push made by: ${env.COMMITTER_EMAIL}"
                }
            }
        }

        stage('Build App Image') {
            steps {
                sh "docker build -t ${IMAGE_APP} ."
            }
        }

        stage('Deploy App') {
            steps {
                // Stop old container if running, then start fresh
                sh "docker rm -f ${IMAGE_APP} 2>/dev/null || true"
                sh """
                    docker run -d \
                        --name ${IMAGE_APP} \
                        --restart unless-stopped \
                        -e MONGODB_URI='${MONGODB_URI}' \
                        -p 3000:3000 \
                        ${IMAGE_APP}
                """
                // Wait until app responds (max 60 seconds)
                sh """
                    echo 'Waiting for app to start...'
                    for i in \$(seq 1 12); do
                        if curl -sf http://localhost:3000 > /dev/null 2>&1; then
                            echo 'App is up and running!'
                            break
                        fi
                        echo "  Attempt \$i/12 — not ready yet, waiting 5s..."
                        sleep 5
                    done
                """
            }
        }

        stage('Build Test Image') {
            steps {
                sh "docker build -f Dockerfile.test -t ${IMAGE_TEST} ."
            }
        }

        stage('Run Selenium Tests') {
            steps {
                sh "mkdir -p ${RESULTS_DIR}"
                sh """
                    docker run --rm \
                        --network host \
                        -e APP_URL=${APP_URL} \
                        -v ${RESULTS_DIR}:/test-results \
                        ${IMAGE_TEST}
                """
            }
            post {
                always {
                    junit allowEmptyResults: true,
                          testResults: 'test-results/results.xml'
                }
            }
        }

    }

    // App container is LEFT RUNNING after the pipeline
    // so the deployment stays up (as required by the assignment)
    post {
    always {
        script {
            def status  = currentBuild.result ?: 'SUCCESS'
            def emoji   = status == 'SUCCESS' ? '✅' : '❌'
            def subject = "${emoji} Irfani Events — Tests ${status} (Build #${env.BUILD_NUMBER})"
            def appUrl  = env.APP_URL ?: 'http://localhost:3000'
            def committer = env.COMMITTER_EMAIL ?: 'unknown'

            def body = """
                <html><body>
                <h2>Irfani Events — Selenium Test Results</h2>
                <table border="1" cellpadding="8">
                  <tr><td><b>Build Status</b></td><td>${status}</td></tr>
                  <tr><td><b>Build Number</b></td><td>${env.BUILD_NUMBER}</td></tr>
                  <tr><td><b>Triggered By</b></td><td>${committer}</td></tr>
                  <tr><td><b>Branch</b></td><td>${env.GIT_BRANCH}</td></tr>
                  <tr><td><b>App URL</b></td><td>${appUrl}</td></tr>
                </table>
                <br>
                <p>The full HTML test report is attached to this email.</p>
                <p><a href="${env.BUILD_URL}testReport">Click here to view results in Jenkins</a></p>
                </body></html>
            """

            if (committer != 'unknown') {
                emailext(
                    to:          "${committer}",
                    subject:     subject,
                    body:        body,
                    mimeType:    'text/html',
                    attachmentsPattern: 'test-results/report.html'
                )
            }
        }
    }
}
}
