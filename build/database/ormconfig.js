"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chapter_entity_1 = require("../modules/chapter/chapter.entity");
const library_entity_1 = require("../modules/library/library.entity");
const novel_entity_1 = require("../modules/novel/novel.entity");
const source_entity_1 = require("../modules/source/source.entity");
const user_entity_1 = require("../modules/user/user.entity");
const config = {
    type: 'postgres',
    host: process.env.HOST,
    port: Number(process.env.PORT_DB),
    username: process.env.USERNAME_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.NAME_DB,
    entities: [user_entity_1.User, novel_entity_1.Novel, chapter_entity_1.Chapter, source_entity_1.Source, library_entity_1.Library],
    synchronize: true,
};
exports.default = config;
