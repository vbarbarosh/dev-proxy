const fs_path_resolve = require('@vbarbarosh/node-helpers/src/fs_path_resolve');

function var_dir(path)
{
    return fs_path_resolve(__dirname, '../../var', path);
}

module.exports = var_dir;
