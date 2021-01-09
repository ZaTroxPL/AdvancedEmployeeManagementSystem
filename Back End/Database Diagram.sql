DELIMITER //

CREATE TABLE `user` (
  `user_id` int ZEROFILL PRIMARY KEY NOT NULL AUTO_INCREMENT
);

CREATE TABLE `account` (
  `account_id` binary(16) PRIMARY KEY NOT NULL,
  `holiday_id` binary(16),
  `manager_id` int ZEROFILL,
  `user_id` int ZEROFILL,
  `is_employee` boolean,
  `is_manager` boolean,
  `salary` decimal(19,4)
);

CREATE TABLE `holiday` (
  `holiday_id` binary(16) PRIMARY KEY NOT NULL,
  `total_holidays` int ZEROFILL,  
  `holidays_left` int ZEROFILL,
  `holidays_booked` int ZEROFILL,
  `on_holiday_for` int ZEROFILL,
  `is_on_holiday` boolean
);

CREATE TABLE `holiday_request` (
  `holiday_request_id` binary(16) PRIMARY KEY NOT NULL,
  `holiday_id` binary(16),
  `time_of_day_id` int ZEROFILL,
  `start_date` date,
  `end_date` date,
  `holiday_request_body` mediumtext,
  `holidays_taken` int ZEROFILL
);

CREATE TABLE `time_of_day` (
  `time_of_day_id` int ZEROFILL PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` text
);

CREATE TABLE `working_days` (
  `working_days_id` binary(16) PRIMARY KEY NOT NULL,
  `holiday_id` binary(16),
  `working_days` json
);

CREATE TABLE `report_complaint` (
  `report_complaint_id` binary(16) PRIMARY KEY NOT NULL,
  `complaint_category_id` int ZEROFILL,
  `account_id` binary(16),
  `complaint_body` mediumtext,
  `send_to_your_manager` boolean
);

CREATE TABLE `complaint_category` (
  `complaint_category_id` int ZEROFILL PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` mediumtext
);

ALTER TABLE `account` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

ALTER TABLE `account` ADD FOREIGN KEY (`manager_id`) REFERENCES `user` (`user_id`);

ALTER TABLE `holiday` ADD FOREIGN KEY (`holiday_id`) REFERENCES `account` (`holiday_id`);

ALTER TABLE `holiday_request` ADD FOREIGN KEY (`holiday_id`) REFERENCES `holiday` (`holiday_id`);

ALTER TABLE `time_of_day` ADD FOREIGN KEY (`time_of_day_id`) REFERENCES `holiday_request` (`time_of_day_id`);

ALTER TABLE `working_days` ADD FOREIGN KEY (`working_days_id`) REFERENCES `holiday` (`holiday_id`);

ALTER TABLE `report_complaint` ADD FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`);

ALTER TABLE `report_complaint` ADD FOREIGN KEY (`complaint_category_id`) REFERENCES `complaint_category` (`complaint_category_id`);

//

DELIMITER ;