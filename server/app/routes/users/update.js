const User = require('../../models/Users');
const router = require('express').Router();
const bcrypt = require('bcryptjs');

router.put('/api/v1/user/password/:id', async(req, res) => {
    if (!req.body) {
        return res.status(400).send({
            info: "filed cannot be empty"
        })
    }

    const { newPassword, oldPassword } = req.body
    const findUser = await User.findById(req.params.id)

    if (!findUser) {
        return res.status(404).send({
          info: "Email not found"
        })
    }

    const verified = bcrypt.compareSync(oldPassword, findUser.password);
    if (!verified) {
      return res.status(403).send({
        info: 'Invalid password'
      })
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);

    findUser.set({
        password: hashedPassword
    })

    await findUser.save();

    // User.updateOne({id: req.params.id}, {password: hashedPassword}, function(error) {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log("Password updated successfully")
    //     }
    // })

    
    return res.status(200).send({
        info: `Password updated successfully!`
    })

})

module.exports = router;