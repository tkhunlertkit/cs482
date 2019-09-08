"""empty message

Revision ID: dbe04a0a66b7
Revises: 
Create Date: 2019-09-08 07:53:24.200650

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'dbe04a0a66b7'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('item_lookup',
    sa.Column('number', sa.String(length=100), nullable=False),
    sa.Column('description', sa.String(length=100), nullable=False),
    sa.PrimaryKeyConstraint('number'),
    sa.UniqueConstraint('description'),
    sa.UniqueConstraint('number')
    )
    op.drop_table('cusotmer')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('cusotmer',
    sa.Column('username', sa.VARCHAR(length=100), nullable=False),
    sa.Column('full_name', sa.VARCHAR(length=150), nullable=False),
    sa.Column('address', sa.VARCHAR(length=300), nullable=False),
    sa.PrimaryKeyConstraint('username'),
    sa.UniqueConstraint('address'),
    sa.UniqueConstraint('full_name'),
    sa.UniqueConstraint('username')
    )
    op.drop_table('item_lookup')
    # ### end Alembic commands ###