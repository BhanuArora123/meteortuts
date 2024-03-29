import { Meteor } from "meteor/meteor";
import React from "react";
import { check } from "meteor/check";
import { TasksCollection } from "./tasks";

Meteor.methods({
    "tasks.insert"(text) {
        check(text, String);

        if (!this.userId) {
            throw new Meteor.Error("not authorised!");
        }

        TasksCollection.insert({
            text: text,
            user:{
                _id: this.userId
            }
        });
    },
    'tasks.remove'(taskId) {
        check(taskId, String);

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        TasksCollection.remove(taskId);
    },

    'tasks.setIsChecked'(taskId, isChecked) {
        check(taskId, String);
        check(isChecked, Boolean);

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        TasksCollection.update(taskId, {
            $set: {
                isChecked
            }
        });
    }
})