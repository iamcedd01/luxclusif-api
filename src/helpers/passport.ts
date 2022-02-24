import passport from 'passport';
import passportLocal from 'passport-local';

const LocalStrategy = passportLocal.Strategy;

passport.use(
    new LocalStrategy(
        {
            // Strategy is based on username & password. Substitue email for username.
            usernameField: 'user[email]',
            passwordField: 'user[password]',
        },
        (email, password, done) => {}
    )
);
