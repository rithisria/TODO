import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Todo from '@/models/Todo';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    const todo = await Todo.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!todo) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }

    return NextResponse.json(todo);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Todo deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
