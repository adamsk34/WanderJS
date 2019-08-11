/**
    Copyright 2019 Kevin Adams ©

    This file is a part of WanderJS

    WanderJS is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    WanderJS is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with WanderJS.  If not, see <https://www.gnu.org/licenses/>.
*/

const templateHandler = require("../lib/hatNoteTemplateHandler");

const HatNote = function (hatNoteTemplate) {
    if (hatNoteTemplate.template !== "for") {
        throw { error: `Invalid template: ${hatNoteTemplate.template}, expected \"for\"` };
    }

    // TODO: I should not be iterating over keys expecting them to come in a specific order
    //       wikitext-js is the reason why this is bad

    this.text = templateHandler.getHatNoteText(hatNoteTemplate);
    this.links = templateHandler.getHatNoteLinks(hatNoteTemplate);
};

module.exports = HatNote;
