pipeline {
  agent any

  environment {
    DEPLOY_USER = 'ec2-user'
    DEPLOY_HOST = '65.0.125.230'
    DEPLOY_PATH = '/home/ec2-user/attendance-app'
    ENV_FILE = '.env'
  }

  stages {
    stage('Checkout Code') {
      steps {
        git branch: 'main', url: 'https://github.com/sikandarkr/AttendenceBackend.git', credentialsId: 'github-creds'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Deploy to EC2') {
      steps {
        sshagent(['node-ec2-ssh']) {
          script {
            // Prepare remote environment
            sh """
              ssh $DEPLOY_USER@$DEPLOY_HOST '
                command -v node >/dev/null 2>&1 || (
                  curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
                  sudo yum install -y nodejs
                );

                command -v pm2 >/dev/null 2>&1 || sudo npm install -g pm2;

                mkdir -p $DEPLOY_PATH
              '
            """

            // Sync files (excluding heavy/unwanted folders)
            sh """
              rsync -avz --exclude node_modules --exclude .git ./ $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH
            """

            // Copy .env file if it exists
            sh """
              if [ -f $ENV_FILE ]; then
                scp $ENV_FILE $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH/.env
              fi
            """

            // Start/restart app
            sh """
              ssh $DEPLOY_USER@$DEPLOY_HOST '
                cd $DEPLOY_PATH
                npm install
                pm2 restart index.js || pm2 start index.js
              '
            """
          }
        }
      }
    }
  }

  post {
    success {
      echo '✅ Deployment Successful!'
    }
    failure {
      echo '❌ Deployment Failed!'
    }
  }
}
