const io = require('../socket');

const Ticket = require('../models/ticketModel');
// const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

let preferencialTimes = 0;

const randomTicket = async (min, max) => {
  const random = Math.round(Math.random() * (max - min)) + min;
  const tickets = await Ticket.find({ number: random });
  return tickets.length ? randomTicket(min, max) : random;
};

exports.callTicket = catchAsync(async (req, res, next) => {
  let skipPriority;
  if (preferencialTimes >= 3) {
    const normalTicket = await Ticket.countDocuments(
      { priority: 'Normal', blocked: undefined },
      { limit: 1 }
    );
    if (normalTicket) skipPriority = 'Preferencial';
  } // For each 3 preferential calls, 1 normal should be called

  const ticket = await Ticket.findOneAndUpdate(
    {
      _id: { $ne: req.params.skipID },
      roomID: undefined,
      priority: { $ne: skipPriority },
      blocked: undefined,
    },
    // { roomID: req.user.roomID },
    { roomID: 'SALA 12' },
    { sort: { priority: -1 }, new: true, runValidators: true }
  );

  if (!ticket) {
    return next(new AppError('All tickets were treated!', 404));
  }

  io.emit('ticket', ticket);

  res.status(200).json({
    status: 'success',
    data: {
      ticket,
    },
  });

  if (ticket.priority === 'Preferencial') {
    preferencialTimes += 1;
  } else if (ticket.priority === 'Normal') {
    preferencialTimes = 0;
  }
});

exports.createTicket = catchAsync(async (req, res, next) => {
  const ticketNumber = await randomTicket(1, 999);

  const newTicket = await Ticket.create({
    priority: req.body.priority,
    number: ticketNumber,
  });

  res.status(201).json({
    status: 'success',
    data: {
      ticket: newTicket,
    },
  });
});

exports.skipTicket = catchAsync(async (req, res, next) => {
  const ticket = await Ticket.findByIdAndUpdate(
    req.params.id,
    { $unset: { roomID: '' }, $inc: { skipTimes: 1 } },
    {
      new: true,
      runValidators: true,
    }
  );

  if (ticket.priority === 'Preferencial') {
    preferencialTimes -= 1;
  }

  if (ticket.skipTimes >= 5) {
    return next();
  }

  res.status(200).json({
    status: 'success',
    data: {
      ticket,
    },
  });
});

exports.blockTicket = catchAsync(async (req, res, next) => {
  const ticket = await Ticket.findByIdAndUpdate(
    req.params.id,
    {
      blocked: true,
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: 'success',
    data: {
      ticket,
    },
  });
});

// exports.getLastCall = catchAsync(async (req, res, next) => {
// }); To end with local storage in frontend.
