import 'dotenv/config'
import {exec} from 'child_process'
import util from 'util'

const execAsync = util.promisify(exec)

const TestLogin = async()=>{
    try{const command = `
    curl --silent --location \
     -w "\\n%{http_code}" \
    '${process.env.BASE_URL}/users/login' \
    -H 'Content-Type: application/json' \
    -d '{
        "username" : "${process.env.TEST_USERNAME}",
        "password": "${process.env.TEST_PASSWORD}"
    }'`
    const { stdout} = await execAsync(command)
    const [body, status] = stdout.split('\n')
    const response = JSON.parse(body)
     if (status !== `200`) {
      throw new Error(`Status ${status}: ${JSON.stringify(response)}`)
    }

    console.log('Login test passed!', response)}
    catch(err){
         console.error('Login test failed:', err.message)
         process.exit(1)
    }
}

TestLogin()
