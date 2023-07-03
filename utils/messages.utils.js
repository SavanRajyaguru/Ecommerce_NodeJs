const messages = {
    catch: 'Something went wrong',
    tokenError: 'Token not created',
    statusSuccess: 'Success',
    registeredSuccess: 'You are registered successfully',
    alreadyRegisteredUser: 'Already registered',
    loginSuccess: 'You are logged in successfully',
    loginEmailNotRegistered: 'Email not registered',
    wrongpass: 'Password doesnt match',
    emailReq: 'Email id is required',
    passReq: 'Password is required',
    fistNameReq: 'Firstname required',
    lastNameReq: 'Lastname required',
    updatedProfile: 'Profile successfully updated',
    process: 'you can edit now',
    invalidCredentials: 'Invalid credentials',
    doNotChangeEmail: 'Cannot change email and password',
    changePass: 'Password changed successfully',
    orderSucess: 'Order placed successfully',
    unAuthorized: 'You are unauthorized!',
    alreadyLoggedin: 'Already logged in',
    productRegistered: 'Already Registered Product',
    routeNotFound: 'Route Not Found!',
    getBlogs: 'The Blogs are here',
    registerSucess: 'Registered succesfully',
    updateBlogs: 'The Blogs are updated',
    deletBlogs: 'The Blogs are deleted',
    setBlogs: 'The Blogs are created',
    pleaseAddText: 'Please add text ',
    titleRequired: 'Title is required',
    desciptionRequired: 'Description is required',
    blogNotFound: 'There is no blog Presnt with specified Id',
    userNamePattern: 'The pattern for username should be: user_123 or user.124',
    emailPattern: 'Please enter a valid email like user123@gmail.com',
    validMobile: 'Please enter valid mobile with country code',
    validGender: 'Please enter a valid gender, the options are 1.Male 2.Female 3.Others',
    mandatoryFields: 'Please add all fields',
    duplicateTitle: 'You cannot use same title please change title name',
    userNotFound: 'User not found',
    bothIdDiff: 'The id you requested in params and id of email you provided are not same'
}

const statuscode = {
    statusSuccess: 200,
    statusNotFound: 403,
    badRequest: 400,
    unAuthorized: 403,
    pageNotFound: 404
}

module.exports = { messages, statuscode }
