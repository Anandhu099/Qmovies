const mongoose = require("mongoose");
// NOTE - "validator" external library and not the custom middleware at src/middlewares/validate.js
const validator = require("validator");
const bcrypt = require("bcryptjs");

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Complete userSchema, a Mongoose schema for "users" collection
const userSchema = mongoose.Schema(
  {
    
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase:true,
      validate(value)
      {
        if(!validator.isEmail(value))
        {
          throw new Error("Invalid Email")
        }
      }
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minength:8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
    },
  },
  // Create createdAt and updatedAt fields automatically
  {
    timestamps: true,
  }
);

userSchema.statics.isEmailTaken = async function (email) {
  const result = await this.findOne({ email: email });
  // console.log(result);   
  return result;
};


userSchema.methods.isPasswordMatch = async function (password) {
  return bcrypt.compare(password, this.password);
};



 const User=mongoose.model("user",userSchema);  
 module.exports ={User}