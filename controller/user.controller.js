const User = require('../models/user.model');
const Post = require('../models/post.model');

// Login controller
exports.login = function (request, response) {
    const user = {
        email: request.body.email,
        password: request.body.password
    }

    User.findOne(user, function (error, user) {
        if (error || !user) {
            response.render('invalid-login.hbs');
            return;
        }

        request.session.user = user;
        response.redirect('/home');
    })
}

exports.signUp = function (request, response) {
    const entry = new User({
        name: request.body.name,
        email: request.body.email,
        password: request.body.password
    });

    entry.save(function (error) {
        if (error) {
            response.redirect('login');
        } else {
            response.redirect('login');
        }
    })
};


exports.home = function (request, response) {
    console.log(request.session.user)
    if (!request.session.user) {
        return response.redirect('/login')
    };

    const query = Post.find()
    query.limit(10)
        .exec(function (error, data) {

            var data = {
                allPosts: data,
                loggedInUser: request.session.user
            };
            response.render('index.hbs', data);
        })
};


exports.add = function (request, response) {
    console.log(request.session.user)
    var entry = new Post({
        title: request.body.title,
        content: request.body.content,
        userId: request.session.user._id
    })

    entry.save(function (err) {
        if (err) {
            response.send('Error creating the blog post' + err);
        } else {
            response.redirect('/add?success=true');
        }
    })
};


exports.edit = function (req, res) {
    if (!req.session.user) {
        res.redirect('/login');
    }

    let mongoId = req.params.id;
    let editSuccess = req.params.success;

    Post.findOne({ _id: mongoId }, function (err, data) {
        if (err) {
            res.send('Erros: Post Not found');
        }

        if (editSuccess) {
            data.success = true;
        }

        res.render('edit.hbs', data)
    })
};


exports.update = function (req, res) {
    if (!req.session.user) {
        res.redirect('/login');
    }

    var mongoId = req.params.id;
    let newTitle = req.body.title;
    let newContent = req.body.content;

    Post.updateOne({
        _id: mongoId
    },
        {
            $set: { title: newTitle, content: newContent }
        }, function (err, data) {
            res.redirect('/edit/' + mongoId + '?success=true')
        }
    )
}

