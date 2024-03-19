const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: [validator.isAlpha, "Username can only have letters"]
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'Provide a valid email']
  },
  password: {
    type: String,
    required: true,
    select: false,
    validate: {
      validator: function(value) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
      },
      message: props => `${props.value} is not a valid password`
    }
  },
  passwordRepeat: {
    type: String,
    required: true,
    select:false,
    validate: {
      validator: function(value) {
        return value === this.password;
      },
      message: props => `Passwords do not match`
    }
  }, 
  role:{
    type:String,
    enum: ['user','admin'],
    default:'user'
    
  }
});

userSchema.pre('save', async function(next) {
  const user = this;

  if (!user.isModified('password')) return next();

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;

  next();
});

userSchema.methods.correctPassword = async function(candidatePass, userPass)
{
    return  await bcrypt.compare(candidatePass, userPass)
}

const User = mongoose.model("User", userSchema);
module.exports = User;
