// bcryptTest.js
import bcrypt from 'bcryptjs';

async function runBcryptTest() {
  try {
    // Example registration process
    const rawPassword = 'Idontknow@@##23';
    const trimmedPassword = rawPassword.trim();
    
    console.log('Raw Password:', rawPassword);
    console.log('Trimmed Password:', trimmedPassword);

    const hashedPassword = await bcrypt.hash(trimmedPassword, 10);
    console.log('Hashed Password:', hashedPassword);

    // Example login process
    const enteredPassword = 'Idontknow@@##23';
    const trimmedEnteredPassword = enteredPassword.trim();

    console.log('Entered Password:', enteredPassword);
    console.log('Trimmed Entered Password:', trimmedEnteredPassword);

    const passwordMatch = await bcrypt.compare(trimmedEnteredPassword, hashedPassword);
    console.log('Password Match:', passwordMatch);

    if (passwordMatch) {
      console.log('Login Successful!');
    } else {
      console.log('Login Failed: Incorrect Password');
    }
  } catch (error) {
    console.error('Error during bcrypt test:', error);
  }
}

// Run the test
runBcryptTest();
