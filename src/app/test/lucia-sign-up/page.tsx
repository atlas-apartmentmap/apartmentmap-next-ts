// /* eslint-disable import/extensions */
// /* eslint-disable react/button-has-type */
// /* eslint-disable jsx-a11y/label-has-associated-control */

/**
 * DAN IF YOU SEE THIS, JUST IGNORE THIS FILE
 * SETUP FIREBASE AUTHENTICATION INSTEAD
 * I DIDNT HAVE PERMISSIONS TO SETUP FIREBASE PROPERLY
 */

// import { hash } from '@node-rs/argon2';
// import { cookies } from 'next/headers';
// import { redirect } from 'next/navigation';
// import { generateIdFromEntropySize } from 'lucia';

// import pool from '@/api/sql/db';
// import { lucia } from '@/api/sql/lucia';

// export default async function SignUpPage() {
//   return (
//     <>
//       <h1>Create an account</h1>
//       {/* @ts-ignore */}
//       <form action={signup}>
//         <label htmlFor="username">Username</label>
//         <input name="username" id="username" />
//         <br />
//         <label htmlFor="password">Password</label>
//         <input type="password" name="password" id="password" />
//         <br />
//         <button>Continue</button>
//       </form>
//     </>
//   );
// }

// async function signup(_: any, formData: FormData): Promise<ActionResult> {
//   'use server';

//   const username = formData.get('username');
//   // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
//   // keep in mind some database (e.g. mysql) are case insensitive
//   if (
//     typeof username !== 'string' ||
//     username.length < 3 ||
//     username.length > 31 ||
//     !/^[a-z0-9_-]+$/.test(username)
//   ) {
//     return {
//       error: 'Invalid username',
//     };
//   }
//   const password = formData.get('password');
//   if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
//     return {
//       error: 'Invalid password',
//     };
//   }

//   const passwordHash = await hash(password, {
//     // recommended minimum parameters
//     memoryCost: 19456,
//     timeCost: 2,
//     outputLen: 32,
//     parallelism: 1,
//   });
//   const userId = generateIdFromEntropySize(10); // 16 characters long

//   const queryText = 'SELECT COUNT(*) FROM "user" WHERE username = $1';
//   const values = [username];

//   try {
//     const { rows } = await pool.query(queryText, values);
//     const count = parseInt(rows[0].count, 10);

//     if (count > 0) {
//       throw new Error('Username already exists');
//     }

//     // Insert the new user if username is not already used
//     const insertQuery = `
//    INSERT INTO "user" (id, username, password_hash)
//    VALUES ($1, $2, $3)
//  `;
//     const insertValues = [userId, username, passwordHash];

//     await pool.query(insertQuery, insertValues);
//     console.log('User inserted successfully');
//   } catch (error) {
//     console.error('Error inserting user:', error.message);
//     // Handle error as needed (e.g., return an error response)
//   }

//   const session = await lucia.createSession(userId, {});
//   const sessionCookie = lucia.createSessionCookie(session.id);
//   cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
//   return redirect('/');
// }

// interface ActionResult {
//   error: string;
// }
